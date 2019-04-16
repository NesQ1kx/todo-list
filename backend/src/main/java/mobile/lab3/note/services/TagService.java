package mobile.lab3.note.services;

import mobile.lab3.note.common.entity.Tags;
import mobile.lab3.note.datacontracts.TagRepository;
import mobile.lab3.note.servicescontracts.TagServicable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
