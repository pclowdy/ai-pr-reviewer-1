import uvicorn
import typer
import os

app = typer.Typer()

@app.command()
def start(port: int = None):
    """
    Start the FastAPI Web Server for the frontend.
    """
    # Render injects a PORT env var — fall back to 8000 for local dev
    port = port or int(os.environ.get("PORT", 8000))
    typer.echo(f"Starting web server on http://0.0.0.0:{port}")
    uvicorn.run("src.api:app", host="0.0.0.0", port=port, reload=False)

if __name__ == "__main__":
    app()
