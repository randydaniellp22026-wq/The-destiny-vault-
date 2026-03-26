import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, ArrowLeft, ExternalLink } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [steps, setSteps] = useState('initial');
    const [brands, setBrands] = useState([]);
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    id: 1,
                    type: 'bot',
                    text: '👋 ¡Hola! Bienvenido a The Destiny Vault. Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
                    options: [
                        { label: '💰 Formas de pago', value: 'pagos' },
                        { label: '🚗 Recibir auto parte de pago', value: 'trade_in' },
                        { label: '🔍 Buscar por marca', value: 'brands' }
                    ]
                }
            ]);
        }
        scrollToBottom();
    }, [isOpen, messages]);

    useEffect(() => {

        // Carga de marcas y configuración
        fetch('http://localhost:5000/vehicles')
            .then(res => res.json())
            .then(data => {
                // Extraemos la marca (primer palabra del nombre del vehículo)
                const uniqueBrands = [...new Set(data.map(v => v.brand || v.name.split(' ')[0]))];
                setBrands(uniqueBrands);
            });

        fetch('http://localhost:5000/settings')
            .then(res => res.json())
            .then(data => {
                setWhatsappNumber(data.company?.whatsapp || '+506 6476-9091');
            });
    }, []);

    const handleOptionClick = (option) => {
        // Enviar mensaje del usuario
        const userMsg = { id: Date.now(), type: 'user', text: option.label };
        setMessages(prev => [...prev, userMsg]);

        setIsTyping(true);
        setTimeout(() => {
            processBotResponse(option.value);
            setIsTyping(false);
        }, 1500); // Dar sensación de "escribiendo"
    };

    const processBotResponse = (value) => {
        let botMsg = { id: Date.now() + 1, type: 'bot' };
        const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;

        const fallbackPrompt = `\n\n¿No pude resolver tu duda? Comunícate a nuestro WhatsApp para una atención personalizada:`;

        switch (value) {
            case 'pagos':
                botMsg.text = `Contamos con diversas formas de pago para tu comodidad:\n\n• Transferencia Bancaria Directa\n• Financiamiento con Bancos (BAC, Nacional, BCR)\n• Crédito Interno Directo\n• Pagos con Cripto-activos (Bitcoin/Ethereum)` + fallbackPrompt;
                botMsg.whatsapp = whatsappLink;
                botMsg.options = [{ label: '⬅️ Volver al inicio', value: 'initial' }];
                break;
            case 'trade_in':
                botMsg.text = `¡Claro! Recibimos tu vehículo actual como parte de pago tras una valoración técnica en nuestras sedes. Solo debe ser del año 2012 en adelante y estar en buen estado.` + fallbackPrompt;
                botMsg.whatsapp = whatsappLink;
                botMsg.options = [{ label: '⬅️ Volver al inicio', value: 'initial' }];
                break;
            case 'brands':
                botMsg.text = 'Estas son las marcas que tenemos disponibles actualmente en nuestro inventario:';
                botMsg.options = brands.map(b => ({ label: b, value: `brand_${b}` }));
                botMsg.options.push({ label: '⬅️ Volver', value: 'initial' });
                break;
            case 'initial':
                botMsg.text = '¿Hay algo más en lo que pueda asistirte?';
                botMsg.options = [
                    { label: '💰 Formas de pago', value: 'pagos' },
                    { label: '🚗 Recibir auto parte de pago', value: 'trade_in' },
                    { label: '🔍 Buscar por marca', value: 'brands' }
                ];
                break;
            default:
                if (value.startsWith('brand_')) {
                    const selectedBrand = value.replace('brand_', '');
                    botMsg.text = `Actualmente tenemos varias unidades de ${selectedBrand} en stock. Puedes ver los detalles en nuestro catálogo o solicitar una cotización directa.` + fallbackPrompt;
                    botMsg.whatsapp = whatsappLink;
                    botMsg.options = [
                        { label: 'Ver Catálogo', value: 'go_catalog' },
                        { label: '⬅️ Volver a Marcas', value: 'brands' }
                    ];
                } else if (value === 'go_catalog') {
                    window.location.href = '/inventory';
                    return;
                }
                break;
        }

        setMessages(prev => [...prev, botMsg]);
    };

    return (
        <div className={`chatbot-wrapper ${isOpen ? 'is-open' : ''}`}>
            {/* Botón flotante */}
            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
                {!isOpen && <span className="notification-badge">1</span>}
            </button>

            {/* Ventana de chat */}
            <div className="chatbot-window">
                <div className="chatbot-header">
                    <div className="bot-info">
                        <div className="bot-avatar">
                            <Bot size={20} color="#000" />
                        </div>
                        <div>
                            <h4>SAVS Assistant</h4>
                            <span className="online-status">En línea</span>
                        </div>
                    </div>
                    <button className="close-btn" onClick={() => setIsOpen(false)}><X size={18} /></button>
                </div>

                <div className="messages-container">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-row ${msg.type}`}>
                            {msg.type === 'bot' && (
                                <div className="avatar-small"><Bot size={14} color="#eab308" /></div>
                            )}
                            <div className="message-content">
                                <p>{msg.text}</p>
                                
                                {msg.whatsapp && (
                                    <a href={msg.whatsapp} target="_blank" rel="noreferrer" className="whatsapp-call-btn">
                                        <ExternalLink size={14} /> WhatsApp SAVS
                                    </a>
                                )}

                                {msg.options && (
                                    <div className="options-container">
                                        {msg.options.map((opt, idx) => (
                                            <button 
                                                key={idx} 
                                                className="option-btn" 
                                                onClick={() => handleOptionClick(opt)}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message-row bot typing">
                            <div className="avatar-small"><Bot size={14} color="#eab308" /></div>
                            <div className="message-content typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chatbot-footer">
                    <p>Powered by The Destiny Vault</p>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
