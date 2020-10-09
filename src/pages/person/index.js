import React, { Component } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import './styles.css';

export default class Personagem extends Component {
    constructor() {
        super();
        this.state = {
            user:[] ,
            filmes:[],
        };
    }

    loadFilms = () => {
        const {personagem} = this.state;
        let {filmes} = this.state;

        personagem.films.forEach(film => {
            api.get(film)
            .then(({data})=>{
                filmes.push(data);
                this.setState({ filmes  } )
            })
        })
    }

    componentDidMount(){
        api.get(`/people/?search=${this.props.match.params.name}`)
        .then(({data})=>{
            if(data.results.length > 0)
                this.setState({
                    personagem:data.results[0],
                    loading:true
                })
            else
                this.setState({
                    error:true,
                    loading:true
                })
        })
        .catch(()=>{
            this.setState({
                personagem:null,
                loading:true,
                error:true
            })
        });
    }

    render(){

        const {personagem,loading,error,filmes} = this.state;
        return(
            <div className="personagem-list">
                {loading && personagem != null?
                    <article   style={{color: personagem.eye_color, flex:1, flexDirection:'column'}}>
                        <div>
                            <p><strong>Nome: {personagem.name}</strong></p>
                            <p><strong>Altura: {personagem.height} cm</strong></p>
                            <p><strong>Peso: {personagem.mass} Kg</strong></p>
                            <p><strong>Ano de Nascimento: {personagem.birth_year}</strong></p>
                            <p><strong>Cor do cabelo: {personagem.hair_color}</strong></p>
                            <p><strong>Cor da pele: {personagem.skin_color}</strong></p>
                            <p><strong>Cor do cabelo: {personagem.eye_color}</strong></p>
                            <p><strong>Gênero: {personagem.gender}</strong></p>
                            <p>
                                <strong>Filmes: </strong>

                                {!filmes.length >0?
                                    <button onClick={()=>this.loadFilms()} className="btn-view-all" style={{color: personagem.eye_color}}>Ver Todos</button>:

                                    filmes.map(element => (
                                        <p style={{marginLeft:10}}>- {element.title}</p>
                                    ))
                                }
                            </p>
                        </div>
                    </article>
                :<Loading/>}
                {error?
                    <article   style={{flex:1, flexDirection:'column'}}>
                        <p>Personagem não encontrado !!!</p>
                    </article>
                :null}
                <div className="actions">
                    <button onClick={()=>window.history.back()}>Voltar</button>
                </div>
            </div>
       )
    }
}