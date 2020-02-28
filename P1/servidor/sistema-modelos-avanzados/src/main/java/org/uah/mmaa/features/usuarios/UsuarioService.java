package org.uah.mmaa.features.usuarios;

import java.util.List;

public interface UsuarioService
{
	public List<Usuario> fetchUsuarios();

	public Usuario insertar(Usuario usuario);

	public Usuario actualizar(Usuario usuario);

	public Long borrar(Long codUsuario);
}