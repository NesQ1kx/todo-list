package mobile.lab3.note.servicescontracts;

import mobile.lab3.note.common.entity.Note;
import mobile.lab3.note.common.exceptions.ObjectNotFoundException;
import mobile.lab3.note.common.viewmodels.AddNoteModel;
import mobile.lab3.note.common.viewmodels.EditNoteModel;


import javax.validation.ValidationException;
import java.util.Optional;

public interface NoteServicable {
    Note get(Integer id) throws ObjectNotFoundException;
    Iterable<Note> findAll();

    boolean add(AddNoteModel model) throws ValidationException;
    boolean edit(EditNoteModel model) throws ValidationException, ObjectNotFoundException;
    void delete(Integer id);
}
