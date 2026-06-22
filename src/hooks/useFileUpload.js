// src/hooks/useFileUpload.js
import { useState, useCallback } from 'react'

export function useFileUpload() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const selectFile = useCallback((selectedFile) => {
    if (!selectedFile) return

    // Valida tipo e tamanho antes de aceitar
    if (!selectedFile.type.startsWith('image/')) {
      alert('Por favor escolhe uma imagem.')
      return
    }
    if (selectedFile.size > 8 * 1024 * 1024) { // 8MB
      alert('A imagem é demasiado grande (máx. 8MB).')
      return
    }

    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
  }, [])

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl) // liberta memória
    setFile(null)
    setPreviewUrl(null)
  }, [previewUrl])

  return { file, previewUrl, selectFile, clearFile }
}