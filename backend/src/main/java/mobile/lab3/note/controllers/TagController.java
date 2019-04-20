package mobile.lab3.note.controllers;

import mobile.lab3.note.common.entity.Tags;
import mobile.lab3.note.common.responsemodels.TagResponseModel;
import mobile.lab3.note.common.responses.Response;
import mobile.lab3.note.common.viewmodels.AddTagModel;
import mobile.lab3.note.servicescontracts.TagServicable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

@RestController
public class TagController extends BaseController{
    private final TagServicable tags;

    public TagController(TagServicable tags) {

        this.tags = tags;
    }

    @GetMapping(path = "/tags/")
    public Response getAll(HttpServletResponse response) {
        Iterable<Tags> allTags = tags.getAll();
        List<TagResponseModel> responseTags = new ArrayList<>();
        allTags.forEach(new Consumer<Tags>() {
            @Override
            public void accept(Tags tags) {
                responseTags.add(new TagResponseModel(tags));
            }
        });

        return this.success(response, responseTags);
    }

    @PostMapping(path = "/tags/add")
    public Response addTag(HttpServletResponse response, @RequestBody AddTagModel model) {
        try {
            if(tags.add(model)) {
                return this.success(response, "Успешно", 201);
            }
        } catch (ValidationException e) {
            return this.error(response, 400, e.getMessage());
        }

        return this.error(response, 500, "Что-то пошло не так");
    }

}
