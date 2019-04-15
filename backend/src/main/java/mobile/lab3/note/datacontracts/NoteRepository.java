package mobile.lab3.note.datacontracts;

import mobile.lab3.note.common.entity.Note;
import org.springframework.data.repository.CrudRepository;

public interface NoteRepository extends CrudRepository<Note, Integer> {
}
