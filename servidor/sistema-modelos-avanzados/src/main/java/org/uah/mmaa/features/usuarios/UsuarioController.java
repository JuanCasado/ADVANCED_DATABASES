package org.uah.mmaa.features.usuarios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("usuarios")
public class UsuarioController
{
	@Autowired
	private UsuarioService usuarioService;

	@GetMapping
	public List<Usuario> getUsuarios()
	{
		return usuarioService.fetchUsuarios();
	}

	@GetMapping("me")
	public Perfil me(@AuthenticationPrincipal Usuario usuario)
	{
		return usuario.getPerfil();
	}

	@PostMapping
	public Usuario postUsuario(@RequestBody Usuario usuario)
	{
		return usuarioService.insertar(usuario);
	}

	@PutMapping
	public Usuario putUsuario(@RequestBody Usuario usuario)
	{
		return usuarioService.actualizar(usuario);
	}

	@DeleteMapping("{id}")
	public Long deleteUsuario(@PathVariable Long id)
	{
		return usuarioService.borrar(id);
	}
}