package mobile.lab3.note.controllers;

import mobile.lab3.note.common.entity.Note;
import mobile.lab3.note.common.exceptions.ObjectNotFoundException;
import mobile.lab3.note.common.responsemodels.NoteResponseModel;
import mobile.lab3.note.common.responses.Response;
import mobile.lab3.note.common.viewmodels.AddNoteModel;
import mobile.lab3.note.common.viewmodels.EditNoteModel;
import mobile.lab3.note.servicescontracts.NoteServicable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

@RestController
public class NoteController extends BaseController {
    private final NoteServicable noteService;

    public NoteController(NoteServicable noteService) {
        this.noteService = noteService;
    }

    @GetMapping(path = "/")
    public Response index(HttpServletResponse response) {
        return this.error(response, 501);
    }

    @GetMapping(path = "/get")
    public Response get(@RequestParam(required = false) Integer id, HttpServletResponse response) {
        if (id == null) {
            Iterable<Note> notes = noteService.findAll();
            return this.success(response, createResponseNote(notes));
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

    @PostMapping(path = "edit")
    public Response edit(@RequestBody EditNoteModel model, HttpServletResponse response) {
        try {
            if(noteService.edit(model)) {
                return this.success(response, "Успешно", 200);
            }
        } catch (ObjectNotFoundException e) {
            return this.error(response, 404, e.getMessage());
        } catch (ValidationException e) {
            return this.error(response, 400, e.getLocalizedMessage());
        }

        return this.error(response, 500);
    }

    @GetMapping(path = "/delete")
    public Response delete(@RequestParam Integer id, HttpServletResponse response) {
        this.noteService.delete(id);

        return this.success(response, "Дело сделано");
    }

    @GetMapping(path = "/fetch-tag")
    public Response fetchByTag(HttpServletResponse response, @RequestParam Integer tagId) {
        Iterable<Note> notes = null;
        try {
            notes = noteService.findByTag(tagId);
        } catch (ObjectNotFoundException e) {
            return this.error(response, 404);
        }

        return this.success(response, createResponseNote(notes));
    }

    private List<NoteResponseModel> createResponseNote(Iterable<Note> notesIt) {
        List<NoteResponseModel> responseNote = new ArrayList<>();
        notesIt.forEach(new Consumer<Note>() {
            @Override
            public void accept(Note note) {
                if (note != null) {
                    responseNote.add(new NoteResponseModel(note));
                }

            }
        });

        return  responseNote;
    }
}
