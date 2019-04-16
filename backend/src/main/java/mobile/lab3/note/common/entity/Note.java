package mobile.lab3.note.common.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mobile.lab3.note.common.viewmodels.EditNoteModel;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name = "note")
@Getter
@Setter
@NoArgsConstructor
public class Note implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "title")
    @NotNull
    @NotEmpty
    private String title;

    @Column(name = "text")
    @NotNull
    @NotEmpty
    private String text;

    @Column(name = "created_at")
    private Timestamp created_at;

    @OneToMany(cascade=CascadeType.ALL, mappedBy = "note")
    private Set<NoteTag> tags;

    public NoteTag addTag(Tags tag) {
        NoteTag noteTag = new NoteTag();
        noteTag.setNote(this);
        noteTag.setTag(tag);

        return noteTag;
    }

    public void edit(EditNoteModel model) {
        this.title = model.getTitle();
        this.text = model.getText();
    }

    public void clearTags() {
        this.tags.clear();
    }
}
