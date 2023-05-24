import * as tf from "./src/tf.fesm.js";
import word2idx from "./src/word2idx.json" assert {type: 'json' };
import tag2idx from "./src/tag2idx.json" assert {type: 'json' };
import idx2word from "./src/idx2word.json" assert {type: 'json' };
import idx2tag from "./src/idx2tag.json" assert {type: 'json' };


//retorna o índice do maior valor numérico no array
function argMax(array) {
    return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

/*fornecido pelo Arthur
*melhora a interpretação dos resultados
def pred2label(pred):
    out = []
    for pred_i in pred:
        out_i = []
        for p in pred_i:
            p_i = np.argmax(p)
            out_i.append(idx2tag[p_i])
        out.append(out_i)
    return out
*/

/*minha implementação
pred é um array com 124 sentenças, cada palavra de uma sentença é representada por um array com 9 elementos contendo um valor que se relaciona monotonicamente à probabilidade da palavra pertencer a uma classe(tag).
a função argMax retorna o índice do maior elemento numérico de um array.
*/
function pred2label(pred){
    let out = [];
    for(let sentence in pred){
        let out_i = [];
        for(let i = 0; i < 124; i++){
            let word = pred[sentence][i];
            let tag_id = argMax(word);
            out_i.push(idx2tag[tag_id]);
        }
        out.push(out_i);
    }
    return out;
}

const model = await tf.loadLayersModel("./src/model/model.json");
console.log(model);
const maxlen = 124;
//const frase = [23587, 3647, 25573, 16024, 16526, 13898, 16024, 16142, 11534, 7255, 29541, 15081, 1453, 19444, 11580, 13344, 19439, 802, 16024, 21993, 28528, 2252, 265, 14410, 9695, 3018, 15081, 20847, 8633, 26412, 5724, 1581, 15081, 8326, 24163, 16024, 12386, 25090];
/*
Algumas frases pra testar o modelo:

1 -> [('Takuya', 'B-PER'), ('Takagi', 'I-PER'), ('scored', 'O'), ('the', 'O'), ('winner', 'O'), ('in', 'O'), ('the', 'O'), ('88th', 'O'), ('minute', 'O'), (',', 'O'), ('rising', 'O'), ('to', 'O'), ('head', 'O'), ('a', 'O'), ('Hiroshige', 'B-PER'), ('Yanagimoto', 'I-PER'), ('cross', 'O'), ('towards', 'O'), ('the', 'O'), ('Syrian', 'B-MISC'), ('goal', 'O'), ('which', 'O'), ('goalkeeper', 'O'), ('Salem', 'B-PER'), ('Bitar', 'I-PER'), ('appeared', 'O'), ('to', 'O'), ('have', 'O'), ('covered', 'O'), ('but', 'O'), ('then', 'O'), ('allowed', 'O'), ('to', 'O'), ('slip', 'O'), ('into', 'O'), ('the', 'O'), ('net', 'O'), ('.', 'O')]



*/
let frase_teste = "Takuya Takagi scored the winner in the 88th minute , rising to head a Hiroshige Yanagimoto cross towards the Syrian goal which goalkeeper Salem Bitar appeared to have covered but then allowed to slip into the net .";
frase_teste = frase_teste.split(" ");
console.log("frase de teste");
console.log(frase_teste);
const frase = [];
for(let i = 0; i < frase_teste.length; i++){
    frase.push(word2idx[frase_teste[i]]);
}
console.log("frase de teste convertida pelo dicionario word2idx");
console.log(frase);

var texto = "texto arbitrário";


/*padding
*toda sentença deve ter tamanho maxlen. Se exceder este tamanho, usar split.
*/
while(frase.length < maxlen){
    frase.push(0);
}

console.log(frase.length);

const input = tf.tensor([frase, frase]);
const resultado =  model.predict(input).arraySync();
console.log("resultado");
console.log(resultado);
console.log("resultado(tags)");
console.log(pred2label(resultado));



/*

console.log(pred2label(resultado));

const sentence_test = "Takuya Takagi scored the winner in the 88th minute , rising to head a Hiroshige Yanagimoto cross towards the Syrian goal which goalkeeper Salem Bitar appeared to have covered but then allowed to slip into the net .";
const entrada = sentence_test.split(" ");
console.log(entrada);
const entrada_id = [];
for(let palavra in entrada){
    entrada_id.push(word2idx[entrada[palavra]]);
    console.log("palavra: " + entrada[palavra] + " id " + word2idx[entrada[palavra]]);
    
}
console.log(entrada_id);

while(entrada_id.length < maxlen){
    entrada_id.push(0)
}

const entraduxa = tf.tensor([entrada_id]);

console.log("entrada_id: " + entrada_id);
const saida_teste = model.predict(entraduxa).arraySync();
console.log("saida: " + saida_teste);
console.log(pred2label(model.predict(entraduxa).arraySync()));

let testeargmax = [0.4213102459907532, -0.16750822961330414, -0.8146612048149109, -0.9522113800048828, -0.23567762970924377, -1.234705924987793, -0.7531155943870544, -1.0513405799865723, -1.2427725791931152];


*/

