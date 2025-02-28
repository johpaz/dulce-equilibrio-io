
const ElevenLabsWidget = () => {
  return (
    <section className="py-10 bg-dulce-beige-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-dulce-green mb-8">Háblame y Resuelve tus Dudas</h2>
        <div className="flex justify-center">
          {/* Using dangerouslySetInnerHTML to render the custom element */}
          <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="XdyI8LM6MoIpFM6XbUHV"></elevenlabs-convai>' }} />
        </div>
      </div>
    </section>
  );
};

export default ElevenLabsWidget;
