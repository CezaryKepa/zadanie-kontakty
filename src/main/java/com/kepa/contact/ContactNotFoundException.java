package com.kepa.contact;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Brak firmy o takim ID")
public class ContactNotFoundException extends RuntimeException {
}
