"use client";

import { useEffect } from "react";

export function ImageProtection() {
    useEffect(() => {
        // Prevent right-click context menu on images
        const handleContextMenu = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "IMG") {
                e.preventDefault();
                return false;
            }
        };

        // Prevent dragging images
        const handleDragStart = (e: DragEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "IMG") {
                e.preventDefault();
                return false;
            }
        };

        // Prevent keyboard shortcuts for saving images (Ctrl+S, Cmd+S)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                const activeElement = document.activeElement as HTMLElement;
                if (activeElement && activeElement.tagName === "IMG") {
                    e.preventDefault();
                    return false;
                }
            }
        };

        // Add event listeners
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("dragstart", handleDragStart);
        document.addEventListener("keydown", handleKeyDown);

        // Cleanup
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("dragstart", handleDragStart);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return null; // This component doesn't render anything
}
