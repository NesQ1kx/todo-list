package mobile.lab3.note.common.responsemodels;

import io.swagger.models.auth.In;
import lombok.Getter;
import lombok.Setter;
import mobile.lab3.note.common.entity.Note;
import mobile.lab3.note.common.entity.NoteTag;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Getter
@Setter
public class NoteResponseModel {
    private Integer id;
    private String title;
    private String text;
    private Date created_at;
    private Set<TagResponseModel> tags;

    public NoteResponseModel(Note note) {
     this.created_at = new Date(note.getCreated_at().getTime());
     this.text = note.getText();
     this.id = note.getId();
     this.title = note.getTitle();

     if(!note.getTags().isEmpty()) {
         this.tags = new HashSet<>();

         Iterator<NoteTag> iterator = note.getTags().iterator();

         while (iterator.hasNext()) {
             tags.add(new TagResponseModel(iterator.next().getTag()));
         }
     }
    }
}
