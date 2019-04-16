package mobile.lab3.note.controllers;

import mobile.lab3.note.common.responses.Response;
import mobile.lab3.note.servicescontracts.NoteServicable;
import mobile.lab3.note.servicescontracts.TagServicable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class TagController extends BaseController{
    private final TagServicable tags;

    public TagController(TagServicable tags) {
        this.tags = tags;
    }

    @GetMapping(path = "/tags/")
    public Response getAll(HttpServletResponse response) {
        return this.success(response, tags.getAll());
    }

}
