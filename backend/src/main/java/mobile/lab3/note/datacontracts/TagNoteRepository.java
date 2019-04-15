package mobile.lab3.note.datacontracts;

import mobile.lab3.note.common.entity.NoteTag;
import org.springframework.data.repository.CrudRepository;

public interface TagNoteRepository extends CrudRepository<NoteTag, Integer> {
}
