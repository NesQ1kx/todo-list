package mobile.lab3.note.controllers;

import mobile.lab3.note.common.entity.Note;
import mobile.lab3.note.common.exceptions.ObjectNotFoundException;
import mobile.lab3.note.common.responsemodels.NoteResponseModel;
import mobile.lab3.note.common.responses.Response;
import mobile.lab3.note.common.viewmodels.AddNoteModel;
import mobile.lab3.note.servicescontracts.NoteServicable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.function.Consumer;

@RestController
public class NoteController extends BaseController {
    @Autowired
    private NoteServicable noteService;

    @GetMapping(path = "/")
    public Response index(HttpServletResponse response) {
        return this.error(response, 501);
    }

    @GetMapping(path = "/get")
    public Response get(@RequestParam(required = false) Integer id, HttpServletResponse response) {
        if (id == null) {
            Iterable<Note> notes = noteService.findAll();
            List<NoteResponseModel> responseNote = new ArrayList<>();
            notes.forEach(new Consumer<Note>() {
                @Override
                public void accept(Note note) {
                    responseNote.add(new NoteResponseModel(note));
                }
            });
            return this.success(response, responseNote);
        }

        try {
            return this.success(response, new NoteResponseModel(noteService.get(id)));
        } catch (ObjectNotFoundException e) {
            return this.error(response, 404, "Заметка не найдена");
        }
    }

    @PostMapping(path = "/add")
    public Response add(@RequestBody AddNoteModel model, HttpServletResponse response) {
        try {
            if(noteService.add(model)) {
                return this.success(response, "Успешно", 201);
            }
        } catch (ValidationException e) {
            return this.error(response, 400, e.getMessage());
        }

        return this.error(response, 500);
    }

}
