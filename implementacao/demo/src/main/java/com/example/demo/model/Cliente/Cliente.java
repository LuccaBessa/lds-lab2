package main.java.com.example.demo.model.Cliente;

import java.util.ArrayList;

import main.java.com.example.demo.model.Usuario.Usuario;
import main.java.com.example.demo.model.Endereco.Endereco;
import main.java.com.example.demo.model.Rendimento.Rendimento;

public class Cliente extends Usuario {
    private String RG;
    private String CPF;
    private String profissao;
    private Endereco endereco;
    private ArrayList<Rendimento> redimentos;
}
