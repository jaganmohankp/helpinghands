package com.helpinghands.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginResponseDto {

    public LoginResponseDto(@JsonProperty("message") String message) {
        super();
        this.message = message;
    }
    private String message;
    private LoginResponseData data;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LoginResponseData getData() {
        return data;
    }

    public void setData(LoginResponseData data) {
        this.data = data;
    }
}
