package com.kepa.company.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Firma z takim Nip juz istnieje")
public class DuplicateException extends RuntimeException {

}
