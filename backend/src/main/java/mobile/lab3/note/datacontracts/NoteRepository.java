package mobile.lab3.note.datacontracts;

import mobile.lab3.note.common.entity.Note;
import mobile.lab3.note.common.entity.Tags;
import org.springframework.data.repository.CrudRepository;

public interface NoteRepository extends CrudRepository<Note, Integer> {
    public Iterable<Note> findAllByTags(Tags tags);
}
