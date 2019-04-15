package mobile.lab3.note.services;

import mobile.lab3.note.common.ModelValidator;
import mobile.lab3.note.common.entity.Note;
import mobile.lab3.note.common.entity.NoteTag;
import mobile.lab3.note.common.entity.Tags;
import mobile.lab3.note.common.exceptions.ObjectNotFoundException;
import mobile.lab3.note.common.viewmodels.AddNoteModel;
import mobile.lab3.note.datacontracts.NoteRepository;
import mobile.lab3.note.datacontracts.TagNoteRepository;
import mobile.lab3.note.datacontracts.TagRepository;
import mobile.lab3.note.servicescontracts.NoteServicable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.*;
import java.lang.reflect.Array;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class NoteService implements NoteServicable {
    @Autowired
    private NoteRepository notes;
    @Autowired
    private TagRepository tags;
    @Autowired
    private TagNoteRepository tagNoteRepository;

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

        Integer[] modelTags = model.getTagIds();

        if (modelTags != null) {
            Iterable<Tags> targetTags = tags.findAllById(Arrays.asList(model.getTagIds()));


            List<NoteTag> noteTagList = new ArrayList<>();
            for(Tags target : targetTags) {
                noteTagList.add(note.addTag(target));
            }

            tagNoteRepository.saveAll(noteTagList);
        }

        return notes.save(note) != null;
    }
}
