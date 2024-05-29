import React  from 'react';
import WidgetRech from './Masques/WidgetRech'

const RecherchePoussee = ({widg}) => {
    const operation=['Egale','Entre','Sup.', 'Inf.','Diff.', 'Contient']    
    return(
        <div>
            <div  id={`poussee`} className="modal fade">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true" style={{marginTop: '-1,5rem'}}>×</span>
                        </button>

                        <div className="modal-header" style ={{width: '100%'}}>
                            <h4 id='titre_modal' 
                                className="modal-title" 
                                style ={{textAlign: 'center',width: '100%',color:'red',textShadow: '#FC0 1px 0 10px'}}>
                                Liste des criteres
                            </h4>
                        </div>

                        <div className="modal-body">
                                <input type="hidden" name="_token" value=""/>
                                <div className="form-group"> 
                                    <table>
                                        <thead>
                                            <th style={{textAlign: 'center'}}>Description</th>
                                            <th>operation</th>
                                            <th style={{textAlign: 'center'}}>De </th>
                                            <th style={{textAlign: 'center'}}>A </th>
                                        </thead>
                                        <tbody> 
                                        {widg.colonnes.map(dev=>(
                                            dev.affiche_masque===true?
                                            <tr>
                                                <td style ={{textAlign: 'right',
                                                                color:'blue',
                                                                textShadow: '#FC0 1px 0 10px'
                                                            }}
                                                >
                                                    {dev.description}
                                                </td>
                                                <td>
                                                    <select id='' 
                                                        className="custom-select custom-select-sm mb-1">
                                                        {operation.map(element => (
                                                        (dev.data_type==='character varying'||dev.data_type==='text') && element ==='Contient'? 
                                                            <option>{element}</option>:
                                                            ((dev.data_type==='integer' || dev.data_type==='date'||dev.data_type==='double precision'|| dev.data_type==='smallint') 
                                                              && (element!=='Contient')?<option>{element}</option>:null)
                                                    ))}
                                                    
                                                   </select>
                                                </td>
                                                <td>
                                                    {dev["bdd"]=()=>widg.tabl.bdd}
                                                    {/* {dev['f']=widg.handleChangeAjout}
                                                    {dev['valeur']=()=>(widg.donneeAjout[dev.column_name])} */}
                                                    <WidgetRech mas={dev}/>
                                                </td>
                                                <td>
                                                    {dev["bdd"]=()=>widg.tabl.bdd}
                                                    {dev['suffix']}
                                                    {/* {dev['f']=widg.handleChangeAjout}
                                                    {dev['valeur']=()=>(widg.donneeAjout[dev.column_name])} */}
                                                    {(dev.data_type==='integer' || 
                                                     dev.data_type==='date'||
                                                     dev.data_type==='double precision'|| 
                                                     dev.data_type==='smallint') ?<WidgetRech mas={dev}/>:null}
                                                    
                                                </td>
                                            </tr>
                                            :null
                                        
                                        ))} 
                                        </tbody> 
                                    </table>
                                </div>
                                <div className="form-group" align="justify">
                                    <div>
                                        <button type="button" 
                                            className="btn btn-warning"
                                            data-dismiss="modal"
                                            
                                             onClick={()=>widg.Trouve()} 
                                            
                                            > Chercher
                                        </button>
                                        <span hidden id='id_modif'>1</span>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecherchePoussee