package org.foryou.moodleconduct.dao.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoleVo {
    private Long id;

    private String type;

    private String description;
}
