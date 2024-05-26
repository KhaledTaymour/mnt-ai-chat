import SymbolTransparent from "@/assets/images/symbol-transparent.png";

function NewChat() {
  return (
    <div>
      <p className="text-5xl bg-gradient-to-r from-monta-500 to-red-400 bg-clip-text text-transparent">
        Hello,
      </p>
      <p className="text-5xl bg-gradient-to-r from-monta-200 to-monta-700 bg-clip-text text-transparent">
        How can I help you?
      </p>

      <section className="flex justify-center mt-6">
        <img src={SymbolTransparent} className="h-20" />
      </section>
    </div>
  );
}

export default NewChat;
