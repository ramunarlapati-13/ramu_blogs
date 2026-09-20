import { render, fireEvent } from "@testing-library/react";
import { ImageProtection } from "./ImageProtection";

describe("ImageProtection Component", () => {
    let img: HTMLImageElement;
    let div: HTMLDivElement;

    beforeEach(() => {
        img = document.createElement("img");
        img.tabIndex = 0; // make focusable so it can be document.activeElement
        div = document.createElement("div");
        div.tabIndex = 0;
        document.body.appendChild(img);
        document.body.appendChild(div);
    });

    afterEach(() => {
        document.body.removeChild(img);
        document.body.removeChild(div);
        jest.restoreAllMocks();
    });

    describe("contextmenu event", () => {
        it("prevents default when contextmenu event is dispatched on an IMG element", () => {
            render(<ImageProtection />);

            const event = new MouseEvent("contextmenu", {
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(event, "preventDefault");

            img.dispatchEvent(event);

            expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
            expect(event.defaultPrevented).toBe(true);
        });

        it("does not prevent default when contextmenu event is dispatched on a non-IMG element", () => {
            render(<ImageProtection />);

            const event = new MouseEvent("contextmenu", {
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(event, "preventDefault");

            div.dispatchEvent(event);

            expect(preventDefaultSpy).not.toHaveBeenCalled();
            expect(event.defaultPrevented).toBe(false);
        });
    });

    describe("dragstart event", () => {
        it("prevents default when dragstart event is dispatched on an IMG element", () => {
            render(<ImageProtection />);

            const event = new Event("dragstart", {
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(event, "preventDefault");

            img.dispatchEvent(event);

            expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
            expect(event.defaultPrevented).toBe(true);
        });

        it("does not prevent default when dragstart event is dispatched on a non-IMG element", () => {
            render(<ImageProtection />);

            const event = new Event("dragstart", {
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(event, "preventDefault");

            div.dispatchEvent(event);

            expect(preventDefaultSpy).not.toHaveBeenCalled();
            expect(event.defaultPrevented).toBe(false);
        });
    });

    describe("keydown event (save shortcut)", () => {
        it("prevents default when Ctrl+S is pressed while focused on an IMG element", () => {
            render(<ImageProtection />);
            img.focus();

            const event = new KeyboardEvent("keydown", {
                key: "s",
                ctrlKey: true,
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(event, "preventDefault");

            document.dispatchEvent(event);

            expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
            expect(event.defaultPrevented).toBe(true);
        });

        it("prevents default when Cmd+S (metaKey) is pressed while focused on an IMG element", () => {
            render(<ImageProtection />);
            img.focus();

            const event = new KeyboardEvent("keydown", {
                key: "s",
                metaKey: true,
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(event, "preventDefault");

            document.dispatchEvent(event);

            expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
            expect(event.defaultPrevented).toBe(true);
        });

        it("does not prevent default when Ctrl+S is pressed while focused on a non-IMG element", () => {
            render(<ImageProtection />);
            div.focus();

            const event = new KeyboardEvent("keydown", {
                key: "s",
                ctrlKey: true,
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(event, "preventDefault");

            document.dispatchEvent(event);

            expect(preventDefaultSpy).not.toHaveBeenCalled();
            expect(event.defaultPrevented).toBe(false);
        });

        it("does not prevent default when other keys are pressed (e.g., Ctrl+C or 's' alone)", () => {
            render(<ImageProtection />);
            img.focus();

            const ctrlCEvent = new KeyboardEvent("keydown", {
                key: "c",
                ctrlKey: true,
                bubbles: true,
                cancelable: true,
            });
            const ctrlCSpy = jest.spyOn(ctrlCEvent, "preventDefault");
            document.dispatchEvent(ctrlCEvent);
            expect(ctrlCSpy).not.toHaveBeenCalled();

            const sAloneEvent = new KeyboardEvent("keydown", {
                key: "s",
                bubbles: true,
                cancelable: true,
            });
            const sAloneSpy = jest.spyOn(sAloneEvent, "preventDefault");
            document.dispatchEvent(sAloneEvent);
            expect(sAloneSpy).not.toHaveBeenCalled();
        });
    });

    describe("cleanup on unmount", () => {
        it("removes event listeners when unmounted", () => {
            const { unmount } = render(<ImageProtection />);
            unmount();

            const event = new MouseEvent("contextmenu", {
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(event, "preventDefault");

            img.dispatchEvent(event);

            expect(preventDefaultSpy).not.toHaveBeenCalled();
            expect(event.defaultPrevented).toBe(false);
        });
    });
});
