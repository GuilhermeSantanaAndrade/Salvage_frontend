'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('../axios/http');

var _http2 = _interopRequireDefault(_http);

var _funcoes = require('./funcoes');

var _funcoes2 = _interopRequireDefault(_funcoes);

var _acessoService = require('./acessoService');

var _acessoService2 = _interopRequireDefault(_acessoService);

var _enderecoService = require('./enderecoService');

var _enderecoService2 = _interopRequireDefault(_enderecoService);

var _contatoService = require('./contatoService');

var _contatoService2 = _interopRequireDefault(_contatoService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var patio = {
  Patio: function Patio() {
    var Patio = {
      id: -1,
      guid: '',
      tipo_entidade: '',
      nome: '',
      tipo_pessoa: '',
      cpf_cnpj: '',
      ie: '',
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      endereco: _enderecoService2.default.Endereco(),
      email: '',
      telefone: '',
      ativo: true,
      contatos: [_contatoService2.default.Contato()],
      usuario: _acessoService2.default.Usuario()
    };
    return Patio;
  },
  setPatio: function setPatio(data) {
    var aux = this.Patio();
    if (data === null) return aux;
    aux.id = data.id;
    aux.guid = data.guid;
    aux.tipo_entidade = data.tipo_entidade;
    aux.nome = data.nome;
    aux.tipo_pessoa = data.tipo_pessoa;
    aux.cpf_cnpj = data.cnpJ_CPF;
    aux.ie = data.ie;
    aux.dataCriacao = data.dataCriacao;
    aux.dataAtualizacao = data.dataAtualizacao;
    aux.endereco = _enderecoService2.default.setEndereco(data);
    aux.email = data.email;
    aux.telefone = data.telefone;
    aux.ativo = data.ativo;
    //aux.contatos = data.contato.map(result => {
    //  return contato.setContato(result)
    //}),
    //aux.usuario = acesso.setUsuario(data.usuario)
    return aux;
  },
  setDefaults: function setDefaults(dados) {
    if (dados.tipo_entidade === undefined || dados.tipo_entidade.toString() === '') dados.tipo_entidade = 'Patio';

    if (!dados.tipo_pessoa === undefined || dados.tipo_pessoa.toString() === '') dados.tipo_pessoa = 'PF';

    if (typeof dados.ativo !== 'boolean') dados.ativo = true;

    _enderecoService2.default.setDefaults(dados.endereco);
  },
  validar: function validar(dados) {
    var isAlteracao = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isAlteracao && dados.guid && dados.guid.toString().trim() === '') {
      throw Error('GUID não foi preenchido');
    }

    if (dados.nome.toString().trim() === '') {
      throw Error('NOME não foi preenchido');
    }

    if (dados.tipo_pessoa && dados.tipo_pessoa.toString().trim() === '') {
      throw Error('TIPO PESSOA não foi preenchido');
    }

    if (dados.cpf_cnpj && dados.cpf_cnpj.toString().trim() === '') {
      throw Error('CPF/CNPJ não foi preenchido');
    }

    if (dados.tipo_pessoa === 'PF') {
      if (!_funcoes2.default.validaCPF(dados.cpf_cnpj)) throw Error('CPF inválido');
    } else {
      if (!_funcoes2.default.validaCNPJ(dados.cpf_cnpj)) throw Error('CNPJ inválido');
    }

    if (dados.email && _funcoes2.default.validaEmail(dados.email)) {
      throw Error('E-mail não foi preenchido');
    }

    if (dados.endereco) {
      _enderecoService2.default.validar(dados.endereco, isAlteracao);
    }
  },
  incluir: function incluir(dados) {
    try {
      if (!_funcoes2.default.isEquivalentObjects(dados, this.Patio())) {
        return Promise.reject('Input inválido');
      }

      this.setDefaults(dados);
      this.validar(dados);

      return _http2.default.post('/api/patios/', { "tipoEmpresa": dados.tipo_entidade,
        "tipoPessoa": dados.tipo_pessoa,
        "nome": dados.nome,
        "cnpJ_CPF": dados.cpf_cnpj,
        "ie": dados.ie,
        "dataCriacao": dados.dataCriacao,
        "dataAtualizacao": dados.dataAtualizacao,
        "endereco": dados.endereco.logradouro,
        "cidade": dados.endereco.cidade,
        "uf": dados.endereco.uf,
        "cep": dados.endereco.cep,
        "enderecoNumero": dados.endereco.numero,
        "bairro": dados.endereco.bairro,
        "complemento": dados.endereco.complemento,
        "latitude": dados.endereco.latitude,
        "longitude": dados.endereco.longitude,
        "email": dados.email,
        "telefone": dados.telefone,
        "ativo": dados.ativo
      }).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        return Promise.resolve(response.data);
      }, function (rejected) {
        if (rejected.response && rejected.response.data !== undefined) {
          if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
          }
        } else throw Error(rejected.message.toString());
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  alterar: function alterar(dados) {
    try {
      if (!_funcoes2.default.isEquivalentObjects(dados, this.Patio())) {
        return Promise.reject('Input inválido');
      }

      this.validar(dados, true);

      return _http2.default.put('/api/patios/' + dados.guid, { "id": dados.id,
        "guid": dados.guid,
        "tipoEmpresa": dados.tipo_entidade,
        "tipoPessoa": dados.tipo_pessoa,
        "nome": dados.nome,
        "cnpJ_CPF": dados.cpf_cnpj,
        "ie": dados.ie,
        "dataCriacao": dados.dataCriacao,
        "dataAtualizacao": dados.dataAtualizacao,
        "endereco": dados.endereco.logradouro,
        "cidade": dados.endereco.cidade,
        "uf": dados.endereco.uf,
        "cep": dados.endereco.cep,
        "enderecoNumero": dados.endereco.numero,
        "bairro": dados.endereco.bairro,
        "complemento": dados.endereco.complemento,
        "latitude": dados.endereco.latitude,
        "longitude": dados.endereco.longitude,
        "email": dados.email,
        "telefone": dados.telefone,
        "ativo": dados.ativo
      }).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        return Promise.resolve(response.data);
      }, function (rejected) {
        if (rejected.response && rejected.response.data !== undefined) {
          if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
          }
        } else throw Error(rejected.message.toString());
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  deletar: function deletar(guid) {
    try {
      return _http2.default.delete('/api/patios/' + guid).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        return Promise.resolve(true);
      }, function (rejected) {
        if (rejected.response && rejected.response.data !== undefined) {
          if (_funcoes2.default.propsQuantity(rejected.response.data) > 0) {
            throw Error(rejected.response.data[_funcoes2.default.getPropByIndex(rejected.response.data, 0).toString()]);
          }
        } else throw Error(rejected.message.toString());
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  listar: function listar(dados) {
    var _this = this;

    try {
      var url = '/api/patios/';
      var api_params = {};
      var resultArray = [];

      if (_funcoes2.default.propsQuantity(dados) === 1) {
        //TEMPLATE_PARAMS
        api_params = dados[_funcoes2.default.getPropByIndex(dados, 0).toString()];
        url = url + api_params;
      } else {
        //QUERY_PARAMS
        if (typeof dados.guid === 'string' && dados.guid.toString() !== '') api_params = { guid: dados.guid };
      }

      return _http2.default.get(url, api_params).then(function (response) {
        if (response.status != 200) {
          throw Error(response.data.message);
        }

        if (response.data.data == undefined || response.data.data == null) throw Error('Retorno da API inválido');

        if (Array.isArray(response.data.data)) resultArray = response.data.data;else resultArray.push(response.data.data);

        var listPatios = resultArray.map(function (values) {
          var pat = _this.Patio();

          pat.id = values.id;
          pat.guid = values.guid;
          pat.tipo_entidade = values.tipoEmpresa;
          pat.nome = values.nome;
          pat.tipo_pessoa = values.tipoPessoa === 0 ? 'PJ' : 'PF';
          pat.cpf_cnpj = values.cnpJ_CPF;
          pat.ie = values.ie;
          if (values.dataCriacao !== undefined && values.dataCriacao !== null && values.dataCriacao !== '') pat.dataCriacao = values.dataCriacao;

          if (values.dataAtualizacao !== undefined && values.dataAtualizacao !== null && values.dataAtualizacao !== '') pat.dataAtualizacao = values.dataAtualizacao;

          pat.endereco.logradouro = values.endereco;
          pat.endereco.numero = values.enderecoNumero;
          pat.endereco.complemento = values.complemento;
          pat.endereco.bairro = values.bairro;
          pat.endereco.cidade = values.cidade;
          pat.endereco.uf = values.uf;
          pat.endereco.cep = values.cep;
          pat.endereco.latitude = values.latitude;
          pat.endereco.longitude = values.longitude;

          pat.telefone = values.telefone;
          pat.email = values.email;
          pat.ativo = values.ativo;

          return pat;
        });

        return Promise.resolve(listPatios);
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
exports.default = patio;