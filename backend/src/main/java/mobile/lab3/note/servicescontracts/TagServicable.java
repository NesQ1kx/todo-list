package mobile.lab3.note.servicescontracts;

import mobile.lab3.note.common.entity.Tags;
import mobile.lab3.note.common.viewmodels.AddTagModel;

import javax.validation.ValidationException;

public interface TagServicable {
    Iterable<Tags> getAll();
    boolean add(AddTagModel model) throws ValidationException;
    void delete(Integer id);
}
