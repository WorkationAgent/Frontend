import { theme } from '../theme'

interface LoadingScreenProps {
  message: string
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 56px)',
        gap: 24,
        padding: '48px 24px',
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: 48,
          height: 48,
          border: `4px solid ${theme.brand.bg}`,
          borderTopColor: theme.brand.main,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />

      <p
        style={{
          fontSize: 16,
          color: theme.neutral.secondary,
          fontWeight: 500,
          textAlign: 'center',
          maxWidth: 320,
          lineHeight: 1.6,
        }}
      >
        {message}
      </p>

      <p style={{ fontSize: 13, color: theme.neutral.tertiary }}>잠시만 기다려주세요...</p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
