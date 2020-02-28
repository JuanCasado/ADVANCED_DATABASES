package org.uah.mmaa.features.usuarios;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UsuarioMapper
{
	public Optional<Usuario> selectByEmail(String email);

	public Optional<Usuario> selectByCodUsuario(Long codUsuario);

	public List<Usuario> selectAll();

	public int insert(Usuario usuario);

	public int update(Usuario usuario);

	public int delete(Long codUsuario);
}