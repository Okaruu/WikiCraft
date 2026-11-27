package cl.duoc.wikicraft_api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import cl.duoc.wikicraft_api.model.TipoUsuario;
import cl.duoc.wikicraft_api.model.Usuario;
import cl.duoc.wikicraft_api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class AdminInicial implements CommandLineRunner {

    private final UsuarioRepository repo;
    private final PasswordEncoder encoder;

    @Value("${app.admin.correo:}")
    private String correo;

    @Value("${app.admin.password:}")
    private String password;

    @Override
    public void run(String... args) {
        if (correo.isBlank() || password.isBlank()) return;
        String c = correo.trim().toLowerCase();
        if (repo.existsByCorreo(c)) return;

        Usuario u = new Usuario();
        u.setCorreo(c);
        u.setPasswordHash(encoder.encode(password));
        u.setTipo(TipoUsuario.ADMIN);
        repo.save(u);
        log.info("Usuario administrador creado: {}", c);
    }
}
