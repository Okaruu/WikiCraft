package cl.duoc.wikicraft_api.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import cl.duoc.wikicraft_api.dto.AuthResponse;
import cl.duoc.wikicraft_api.dto.LoginRequest;
import cl.duoc.wikicraft_api.dto.RegistroRequest;
import cl.duoc.wikicraft_api.dto.UsuarioResponse;
import cl.duoc.wikicraft_api.model.TipoUsuario;
import cl.duoc.wikicraft_api.model.Usuario;
import cl.duoc.wikicraft_api.repository.UsuarioRepository;
import cl.duoc.wikicraft_api.security.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    @Transactional
    public UsuarioResponse registrar(RegistroRequest req) {
        String correo = req.correo().trim().toLowerCase();
        if (repo.existsByCorreo(correo))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una cuenta con ese correo");

        Usuario u = new Usuario();
        u.setCorreo(correo);
        u.setPasswordHash(encoder.encode(req.password()));
        u.setTipo(TipoUsuario.USER);
        return UsuarioResponse.from(repo.save(u));
    }

    @Transactional
    public AuthResponse login(LoginRequest req) {
        Usuario u = repo.findByCorreo(req.correo().trim().toLowerCase())
                .filter(x -> encoder.matches(req.password(), x.getPasswordHash()))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos"));
        return new AuthResponse(jwtService.generarTokens(u), UsuarioResponse.from(u));
    }
}