package com.cicc.onedata.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonResponse implements Serializable {

    private String code;
    private Object data;
    private String message;

    public CommonResponse() {
    }

    public CommonResponse(String code, Object data, String message) {
        this.code = code;
        this.data = data;
        this.message = message;
    }
}
