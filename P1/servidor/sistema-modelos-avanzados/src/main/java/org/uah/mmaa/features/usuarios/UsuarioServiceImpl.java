package org.uah.mmaa.features.usuarios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.uah.mmaa.config.security.common.UahUserDetails;
import org.uah.mmaa.core.exception.RecursoDuplicadoException;
import org.uah.mmaa.core.exception.RecursoNoEncontradoException;

@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService, UserDetailsService
{
	@Autowired
	private UsuarioMapper usuarioMapper;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
	{
		Optional<Usuario> usuario = usuarioMapper.selectByEmail(username);

		if (usuario.isEmpty())
			throw new UsernameNotFoundException(username);

		return new UahUserDetails(usuario.get());
	}

	@Override
	public List<Usuario> fetchUsuarios()
	{
		return usuarioMapper.selectAll();
	}

	@Override
	public Usuario insertar(Usuario usuario)
	{
		if (usuarioMapper.selectByEmail(usuario.getPerfil().getEmail()).isPresent())
			throw new RecursoDuplicadoException("Ya existe un usuario con el email: " + usuario.getPerfil().getEmail());
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		usuario.setPwdCifrada(encoder.encode(usuario.getPwdCifrada()));

		usuarioMapper.insert(usuario);

		return usuario;
	}

	@Override
	public Usuario actualizar(Usuario usuario)
	{
		Optional<Usuario> usuarioBD = usuarioMapper.selectByEmail(usuario.getPerfil().getEmail());

		if (usuarioBD.isPresent() && !usuarioBD.get().equals(usuario))
			throw new RecursoDuplicadoException("Ya existe un usuario con el email: " + usuario.getPerfil().getEmail());

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		if (!usuario.getPwdCifrada().equals(usuarioBD.get().getPwdCifrada()))
			usuario.setPwdCifrada(encoder.encode(usuario.getPwdCifrada()));
		
		usuarioMapper.update(usuario);

		return usuario;
	}

	@Override
	public Long borrar(Long codUsuario)
	{
		Optional<Usuario> usuarioBD = usuarioMapper.selectByCodUsuario(codUsuario);

		if (usuarioBD.isEmpty())
			throw new RecursoNoEncontradoException("No se ha encontrado el usuario: " + codUsuario);

		usuarioMapper.delete(codUsuario);

		return codUsuario;
	}
}