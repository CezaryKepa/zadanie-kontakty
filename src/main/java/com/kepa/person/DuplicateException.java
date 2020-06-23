package com.kepa.person;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Osoba z takim peselem juz istnieje")
class DuplicateException extends RuntimeException {

}
