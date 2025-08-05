'use client'

import { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  type?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl'
}

const typeConfig = {
  default: {
    icon: null,
    iconColor: '',
    titleColor: 'text-gray-900'
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-500',
    titleColor: 'text-green-900'
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-900'
  },
  error: {
    icon: XCircle,
    iconColor: 'text-red-500',
    titleColor: 'text-red-900'
  },
  info: {
    icon: Info,
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-900'
  }
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  type = 'default'
}: ModalProps) {
  const config = typeConfig[type]
  const IconComponent = config.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            {IconComponent && (
              <div className={`flex-shrink-0 ${config.iconColor}`}>
                <IconComponent className="h-6 w-6" />
              </div>
            )}
            <DialogTitle className={`text-lg font-semibold ${config.titleColor}`}>
              {title}
            </DialogTitle>
          </div>
          {description && (
            <DialogDescription className="text-gray-600 mt-2">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        {children && (
          <div className="py-4">
            {children}
          </div>
        )}
        
        {footer && (
          <DialogFooter>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Convenience components for common modal types
interface ActionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel?: () => void
  type?: 'success' | 'warning' | 'error' | 'info'
  isLoading?: boolean
}

export function ActionModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  type = 'info',
  isLoading = false
}: ActionModalProps) {
  const handleConfirm = () => {
    onConfirm()
    if (!isLoading) {
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    onOpenChange(false)
  }

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'error':
        return 'bg-red-500 hover:bg-red-600 text-white'
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white'
      case 'success':
        return 'bg-green-500 hover:bg-green-600 text-white'
      default:
        return 'bg-emerald-500 hover:bg-emerald-600 text-white'
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      type={type}
      footer={
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 w-full">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`w-full sm:w-auto ${getConfirmButtonClass()}`}
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </div>
      }
    />
  )
}
