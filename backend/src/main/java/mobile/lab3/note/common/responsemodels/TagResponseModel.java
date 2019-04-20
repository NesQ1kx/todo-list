package mobile.lab3.note.common.responsemodels;

import lombok.Getter;
import lombok.Setter;
import mobile.lab3.note.common.entity.Tags;

@Getter
@Setter
public class TagResponseModel {
    private Integer id;
    private String name;

    public TagResponseModel(Tags tag) {
        this.id = tag.getId();
        this.name = tag.getName();
    }
}
