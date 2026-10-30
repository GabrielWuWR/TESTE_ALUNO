import './BotaoSOS.css'
import '../../../../css/global.css'
import iconeEmergencia from '../../../../img/icones/emergenciaIcone.svg'
import iconeSeta from '../../../../img/icones/setaAvancarBrancaIcone.svg'

function BotaoSOS() {
    return(
        <div className='containerBotaoSOS liquid'>
            <div className="botaoSOS">
                <img src={iconeEmergencia} alt="" />

                <div className='emergenciaTextos'>
                    <h1>SOS</h1>
                    <p>Precisa de ajuda?</p>
                </div>

                <img src={iconeSeta} alt="" />
            </div>
        </div>
    )
}

export default BotaoSOS;