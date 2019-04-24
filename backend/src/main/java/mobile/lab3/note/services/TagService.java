package mobile.lab3.note.services;

import mobile.lab3.note.common.ModelValidator;
import mobile.lab3.note.common.entity.Tags;
import mobile.lab3.note.common.viewmodels.AddTagModel;
import mobile.lab3.note.datacontracts.TagRepository;
import mobile.lab3.note.servicescontracts.TagServicable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.Optional;

@Service
public class TagService implements TagServicable {
    private final TagRepository tags;

    public TagService(TagRepository tags) {
        this.tags = tags;
    }

    @Override
    public Iterable<Tags> getAll() {
        return tags.findAll();
    }

    @Override
    public boolean add(AddTagModel model) throws ValidationException {
        ModelValidator<AddTagModel> validator = new ModelValidator<>();
        validator.validate(model);

        Tags tag = new Tags();
        tag.setName(model.getName());

        return !(tags.save(tag) == null);
    }

    @Override
    public void delete(Integer id) {
        tags.deleteById(id);
    }
}
