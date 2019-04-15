package mobile.lab3.note.common.viewmodels;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
public class AddNoteModel {
    @NotEmpty(message = "Заголовок должен быть не пустым")
    private String title;
    @NotEmpty(message = "Тело заметки должно быть не пустым")
    private String text;
    private Integer[] tagIds;
}
