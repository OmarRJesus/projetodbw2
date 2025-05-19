import Theme  from "../models/themes.js";

export const getThemes = async (req, res) => {
    try {
        const themes = await Theme.find(); 
        res.status(200).json(themes);
    } catch (error) {
        console.error('Erro ao buscar os temas:', error);
        res.status(500).json({ message: 'Erro ao buscar os temas.' });
    }
};

export const getSessions = async (req, res) => {
    const { id } = req.params;

    try {
        const sessionDetails = await Theme.findById(id).populate('participantes.userId', 'username email');

        if (!sessionDetails) {
            return res.status(404).json({ message: 'Sessão não encontrada.' });
        }

        res.status(200).json(sessionDetails);
    } catch (error) {
        console.error('Erro ao buscar detalhes da sessão:', error);
        res.status(500).json({ message: 'Erro ao buscar detalhes da sessão.' });
    }
};