package mobile.lab3.note.datacontracts;

import mobile.lab3.note.common.entity.Tags;
import org.springframework.data.repository.CrudRepository;

public interface TagRepository extends CrudRepository<Tags, Integer> {
}
