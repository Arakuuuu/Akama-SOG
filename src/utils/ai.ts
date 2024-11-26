import { OS } from '../types';

const API_URL = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';

export const generateResponse = async (prompt: string, os: OS): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`
      },
      body: JSON.stringify({
        inputs: `<|system|>You are Akama AI, an expert cybersecurity assistant. Provide detailed, step-by-step guidance for security operations. Always include specific commands and installation instructions for ${os}. Be concise but thorough. Focus on practical, actionable steps.</s>
<|user|>${prompt}</s>
<|assistant|>`,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.15,
          do_sample: true
        }
      })
    });

    const result = await response.json();
    return result[0].generated_text;
  } catch (error) {
    console.error('AI generation error:', error);
    return 'I apologize, but I encountered an error. Please try again or rephrase your question.';
  }
};

export const getInstallCommand = (tool: string, os: OS): string => {
  const commands = {
    linux: {
      wireshark: 'sudo apt-get install wireshark',
      'aircrack-ng': 'sudo apt-get install aircrack-ng',
      nmap: 'sudo apt-get install nmap',
    },
    mac: {
      wireshark: 'brew install wireshark',
      'aircrack-ng': 'brew install aircrack-ng',
      nmap: 'brew install nmap',
    },
    windows: {
      wireshark: 'winget install WiresharkFoundation.Wireshark',
      'aircrack-ng': 'Download from https://www.aircrack-ng.org/downloads.html',
      nmap: 'winget install nmap',
    },
  };

  return commands[os][tool as keyof typeof commands[typeof os]] || 'Package not found';
};

export const generateTitle = (content: string): string => {
  const words = content.toLowerCase().split(' ');
  const keywords = words.filter(word => 
    word.length > 3 && 
    !['what', 'how', 'can', 'will', 'should', 'could'].includes(word)
  );
  
  return keywords.slice(0, 3).join(' ').replace(/^\w/, c => c.toUpperCase());
};