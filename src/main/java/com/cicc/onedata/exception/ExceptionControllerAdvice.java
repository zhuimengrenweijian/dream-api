package com.cicc.onedata.exception;

import com.cicc.onedata.common.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CommonResponse> APIExceptionHandler(Exception exception) {

        CommonResponse response = new CommonResponse();

        if (exception instanceof BaseBusinessException) {
            BaseBusinessException bbe = (BaseBusinessException)exception;
            response.setCode(bbe.getError().getErrorCode());
            response.setData(bbe.getError().getErrorMessage());
            if (exception.getMessage() != null) {
                response.setData(exception.getMessage());
            }
        } else if (exception instanceof BindException) {
            BindException bindException = (BindException)exception;
            response.setCode(DefaultError.PARAMETER_ERROR.getErrorCode());
            response.setData(DefaultError.PARAMETER_ERROR.getErrorMessage());
            FieldError fieldError = bindException.getBindingResult().getFieldError();
            response.setMessage(fieldError.getDefaultMessage());
        }else{
            exception.printStackTrace();
            response.setCode(DefaultError.SYSTEM_INTERNAL_ERROR.getErrorCode());
            response.setData(DefaultError.SYSTEM_INTERNAL_ERROR.getErrorMessage());
        }
        return new ResponseEntity (response, HttpStatus.LOOP_DETECTED);
    }

}
