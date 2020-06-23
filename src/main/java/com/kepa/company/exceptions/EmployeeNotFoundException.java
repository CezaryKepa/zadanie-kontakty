package com.kepa.company.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Brak pracownika o takim ID")
public class EmployeeNotFoundException extends RuntimeException {
}
