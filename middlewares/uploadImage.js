import FroalaEditor from 'wysiwyg-editor-node-sdk/lib/froalaEditor.js';

export default function uploadImage(req, res) {
    console.log('salam')
    try {
        FroalaEditor.Image.upload(req, '/uploads/', function(err, data) {
        // Return data.
        if (err) {
            return res.send(JSON.stringify(err));
        }

        res.send(data);
    });
    } catch(error) {
        console.log(error)
    }
}