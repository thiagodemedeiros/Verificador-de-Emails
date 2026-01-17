import './styles/HomeSection1.css'
import { useState } from 'react';

type VerificacaoEmailResponse = {
    classificacao_do_email: string;
    justificativa: string;
    sugestao: string;
    sugestão: string;
};

export default function HomeSection1() {
    const [classificacaoDoEmail, setClassificacaoDoEmail] = useState("Aguardando Email");
    // const [justificativa, setJustificativa] = useState("");
    const [sugestao, setSugestao] = useState("");
    const [email, setEmail] = useState<string>("");
    const [respostaApi, setRespostaApi] = useState("");
    const [emailCopiado, setEmailCopiado] = useState("Clique aqui, e copia a resposta");

    const copiarParaClipboard = async () => {
        await navigator.clipboard.writeText(sugestao);
        setEmailCopiado("Email copiado com sucesso!");
    };

    async function verificarEmail(email : string) {
        setRespostaApi("aguardando");
        setEmailCopiado("Clique aqui, e copia a resposta");
        setClassificacaoDoEmail("O sistema está analisando...");
        setSugestao("Sua sugestão de resposta esta sendo processada...");

        const response = await fetch(
            "http://127.0.0.1:5000/verificar_email",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ 'email' : email}),
            }
        );

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data: VerificacaoEmailResponse = await response.json();

        console.log(data)
        console.log(data.classificacao_do_email);
        setClassificacaoDoEmail(data.classificacao_do_email);
        console.log(data.justificativa);
        // setJustificativa(data.justificativa);
        const sugestao = data.sugestao ?? data["sugestão"];
        setSugestao(sugestao);

        setRespostaApi("chegou");
    }

    return(
    <section className="HomeSection1">
        <div className='HomeSection1_texto'>
            <h1>Verificador de Emails</h1>
            <h2>Analise, verifique e responda seus emails de forma pratica e facil</h2>
            <div className='HomeSection1_texto_p'>
                <p>Nosso sistema analisa seus e-mails de forma inteligente e dinâmica, oferecendo sugestões de respostas específicas para cada mensagem recebida.</p>
                <p>Aproveitando modelos avançados de inteligência artificial, aceleramos o processo de resposta, permitindo que você economize tempo e tenha mais liberdade para se concentrar nos assuntos que realmente importam no seu dia a dia.</p>
                <p>Além disso, nossa IA avalia se o e-mail é produtivo ou improdutivo, ajudando a priorizar as mensagens mais relevantes e a recomendar respostas precisas, adaptadas à situação.</p>
            </div>
        </div>

        <div className='HomeSection1_inputs'>
            <div className='HomeSection1_inputs_itens'>
                <h3>Digite abaixo o email</h3>
                <textarea
                    placeholder="Escreva aqui..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className='button_enviar_email' onClick={() => verificarEmail(email)}>Clique aqui para enviar o email para analise!</button>

                <div className={`mensagem_email_sendo_verificado ${respostaApi === "aguardando" ? "ativo" : ""}`}>
                    <h3>Aguarde!</h3>
                    <h4>Seu email está sendo analisado pelo nosso sistema</h4>
                </div>

                <div className={`mensagem_email_foi_verificado ${respostaApi === "chegou" ? "ativo" : ""}`}>
                    <h3>Sucesso!</h3>
                    <a href="#sugestao"><h4>Clique <strong>aqui</strong> e veja a sugestão de resposta</h4></a>
                </div>
            </div>
            <div className='HomeSection1_inputs_itens_classificacao' id='sugestao'>
                <h3>Classificação do email</h3>
                <h5>{classificacaoDoEmail}</h5>
            </div>
            <div className='HomeSection1_inputs_itens'>
                <h3>Sugestão de resposta</h3>
                <div className='HomeSection1_inputs_itens_sugestao_resposta'>
                    <p>{sugestao}</p>
                    <button onClick={copiarParaClipboard}>{emailCopiado}</button>
                </div>
            </div>
        </div>
    </section>    
    )
}