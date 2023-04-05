package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Usuario;
import com.example.demo.repositories.UsuarioRepository;

@Service
public class UsuarioService {

   @Autowired
   private UsuarioRepository usuarioRepository;

   public Usuario findById(Integer id){

      Optional<Usuario> usuario = this.usuarioRepository.findById(id);
      return usuario.orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
   }
}
