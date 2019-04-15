package mobile.lab3.note.servicescontracts;

import mobile.lab3.note.common.entity.Note;
import mobile.lab3.note.common.exceptions.ObjectNotFoundException;
import mobile.lab3.note.common.viewmodels.AddNoteModel;


import javax.validation.ValidationException;
import java.util.Optional;

public interface NoteServicable {
    Note get(Integer id) throws ObjectNotFoundException;
    Iterable<Note> findAll();

    boolean add(AddNoteModel model) throws ValidationException;
    void delete(Integer id);
}
