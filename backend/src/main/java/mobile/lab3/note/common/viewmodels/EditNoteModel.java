package mobile.lab3.note.common.viewmodels;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class EditNoteModel extends AddNoteModel {
    @NotNull(message = "id обязательно передавать, как я блять без id тебе отредактирую заметку, голову включи, пасибо")
    private Integer id;
}
