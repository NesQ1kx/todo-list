package mobile.lab3.note.services;

import mobile.lab3.note.common.ModelValidator;
import mobile.lab3.note.common.entity.Note;
import mobile.lab3.note.common.entity.NoteTag;
import mobile.lab3.note.common.entity.Tags;
import mobile.lab3.note.common.exceptions.ObjectNotFoundException;
import mobile.lab3.note.common.viewmodels.AddNoteModel;
import mobile.lab3.note.common.viewmodels.EditNoteModel;
import mobile.lab3.note.datacontracts.NoteRepository;
import mobile.lab3.note.datacontracts.TagNoteRepository;
import mobile.lab3.note.datacontracts.TagRepository;
import mobile.lab3.note.servicescontracts.NoteServicable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.validation.*;
import java.lang.reflect.Array;
import java.sql.Timestamp;
import java.util.*;
import java.util.function.Consumer;

@Service
public class NoteService implements NoteServicable {
    private final NoteRepository notes;
    private final TagRepository tags;
    private final TagNoteRepository tagNoteRepository;

    @PersistenceContext
    private EntityManager em;

    public NoteService(NoteRepository notes, TagRepository tags, TagNoteRepository tagNoteRepository) {
        this.notes = notes;
        this.tags = tags;
        this.tagNoteRepository = tagNoteRepository;
    }

    @Override
    public Note get(Integer id) throws ObjectNotFoundException {
        Optional<Note> target = notes.findById(id);

        if (!target.isPresent()) {
            throw new ObjectNotFoundException("Заметка не найдена");
        }

        return target.get();
    }

    @Override
    public Iterable<Note> findAll() {
        return notes.findAll();
    }

    @Override
    public boolean add(AddNoteModel model) throws ValidationException {
        ModelValidator<AddNoteModel> validator = new ModelValidator<>();
        validator.validate(model);

        Note note = new Note();
        note.setTitle(model.getTitle());
        note.setText(model.getText());
        note.setCreated_at(new Timestamp(System.currentTimeMillis()));

        this.addTags(model, note);

        return notes.save(note) != null;
    }

    @Override
    public boolean edit(EditNoteModel model) throws ValidationException, ObjectNotFoundException {
        ModelValidator<EditNoteModel> validator = new ModelValidator<>();
        validator.validate(model);

        Optional<Note> target = notes.findById(model.getId());
        if (!target.isPresent()) {
            throw new ObjectNotFoundException("Заметка не найдена");
        }

        Note note = target.get();
        note.edit(model);

        this.deleteTags(note.getTags());

        note.clearTags();
        this.addTags(model, note);

        return notes.save(note) != null;
    }

    @Override
    public void delete(Integer id) {
        notes.deleteById(id);
    }

    private void addTags(AddNoteModel model, Note note) {
        Integer[] modelTags = model.getTagIds();

        if (modelTags != null) {
            Iterable<Tags> targetTags = tags.findAllById(Arrays.asList(model.getTagIds()));
            List<NoteTag> noteTagList = new ArrayList<>();

            for(Tags target : targetTags) {
                noteTagList.add(note.addTag(target));
            }

            tagNoteRepository.saveAll(noteTagList);
        }
    }

    private void deleteTags(Set<NoteTag> tags) {
        tags.forEach(new Consumer<NoteTag>() {
            @Override
            public void accept(NoteTag noteTag) {
                noteTag.setNote(null);
                tagNoteRepository.save(noteTag); // TODO: Грязный, мерзкий лайфхак для удаления старых ассоциаций тегов. Надо подключить EntityManager и удалять их через транзакции
            }
        });
    }

}
