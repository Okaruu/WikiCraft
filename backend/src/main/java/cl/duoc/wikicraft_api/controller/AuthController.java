package cl.duoc.wikicraft_api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import cl.duoc.wikicraft_api.dto.AuthResponse;
import cl.duoc.wikicraft_api.dto.LoginRequest;
import cl.duoc.wikicraft_api.dto.RegistroRequest;
import cl.duoc.wikicraft_api.dto.UsuarioResponse;
import cl.duoc.wikicraft_api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse registro(@Valid @RequestBody RegistroRequest req) {
        return service.registrar(req);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        return service.login(req);
    }
}